import React from "react";
import { Formik, Form } from "formik";
import { Box, Button, Link, Flex } from "@chakra-ui/core";
import { Wrapper } from "../components/Wrapper";
import { InputField } from "../components/InputField";
import { useLoginMutation, MeQuery, MeDocument } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";
import NextLink from "next/link";
import { withApollo } from "../utils/withApollo";

import classes from "../style/main.module.scss"

const Login: React.FC<{}> = ({ }) => {
  const router = useRouter();
  const [login] = useLoginMutation();
  return (
    <div className={classes.login_page}>
      <div className={classes.login_content} >
        <div className={classes.login_auth} >
          <div className={classes.login_auth__content} >
            <h1 className={classes.login_title}><span>Войти</span></h1>
            <Formik
              initialValues={{ usernameOrEmail: "", password: "" }}
              onSubmit={async (values, { setErrors }) => {
                const response = await login({
                  variables: values,
                  update: (cache, { data }) => {
                    cache.writeQuery<MeQuery>({
                      query: MeDocument,
                      data: {
                        __typename: "Query",
                        me: data?.login.user,
                      },
                    });
                    cache.evict({ fieldName: "posts:{}" });
                  },
                });
                if (response.data?.login.errors) {
                  setErrors(toErrorMap(response.data.login.errors));
                } else if (response.data?.login.user) {
                  if (typeof router.query.next === "string") {
                    router.push(router.query.next);
                  } else {
                    // worked
                    router.push("/");
                  }
                }
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <InputField
                    name="usernameOrEmail"
                    placeholder="Почта"
                    label="Введите email"
                  />
                  <Box mt={4}>
                    <InputField
                      name="password"
                      placeholder="Пароль"
                      label="Введите пароль"
                      type="password"
                    />
                  </Box>
                  <Flex mt={2}>
                    <NextLink href="/forgot-password">
                      <Link className={classes.item_link} mr="auto">Не помню пароль</Link>
                    </NextLink>
                  </Flex>
                  <Button
                    mt={4}
                    type="submit"
                    isLoading={isSubmitting}
                    variantColor="teal"
                    isFullWidth={true}
                    mb={4}
                  >
                    Войти
                  </Button>
                </Form>
              )}
            </Formik>

            <NextLink href="/register" >
              <Link mt={2} >
                <Button
                  variant="outline"
                  isFullWidth={true}
                >
                  Зарегистрироваться
                </Button></Link>
            </NextLink>


          </div>
        </div>
      </div>
    </div>

  );
};

export default withApollo({ ssr: false })(Login);
