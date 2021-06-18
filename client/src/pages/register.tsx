import React from "react";
import { Formik, Form } from "formik";
import { Box, Button, Link } from "@chakra-ui/core";
import { InputField } from "../components/InputField";
import { useRegisterMutation, MeQuery, MeDocument } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";
import { withApollo } from "../utils/withApollo";
import NextLink from "next/link";

import classes from '../style/register.module.scss'




interface registerProps { }

const Register: React.FC<registerProps> = ({ }) => {
  const router = useRouter();
  const [register] = useRegisterMutation();
  return (
    <div className={classes.main_container}>
      <aside className={classes.presintation}>Аниме шторм</aside>
      <main className={classes.register} >
        <div className={classes.register_block}>
          <div>
            <h1 className={classes.register_header}>Регистрация</h1>
            <div className={classes.register_form}>
              {/* Обработка даннных */}
              <Formik
                initialValues={{ email: "", username: "", password: "" }}
                onSubmit={
                  async (values, { setErrors }) => {
                    const response = await register({
                      variables: { options: values },
                      update: (cache, { data }) => {
                        cache.writeQuery<MeQuery>({
                          query: MeDocument,
                          data: {
                            __typename: "Query",
                            me: data?.register.user,
                          },
                        });
                      },
                    });
                    if (response.data?.register.errors) {
                      setErrors(toErrorMap(response.data.register.errors));
                    } else if (response.data?.register.user) {
                      // worked
                      router.push("/");
                    }
                  }
                }
              >

                {({ isSubmitting }) => (



                  <Form >
                    <InputField
                      name="username"
                      placeholder="Имя"
                      label="Введите имя"
                    />

                    <Box mt={4}>
                      <InputField name="email" placeholder="Email" label="Введите Email" />
                    </Box>
                    <Box mt={4}>
                      <InputField
                        name="password"
                        placeholder="Пароль"
                        label="Введите пароль"
                        type="password"
                      />
                    </Box>
                    <Button
                      mt={4}
                      type="submit"
                      isLoading={isSubmitting}
                      variantColor="teal"
                      isFullWidth={true}
                      mb={4}
                    >

                      Зарегистрироваться
                    </Button>

                  </Form>
                )}
              </Formik>
              <NextLink href="/login">
                <Link mt={2}>
                  <Button
                    variant="outline"
                    isFullWidth={true}
                  >
                    Войти
                  </Button></Link>
              </NextLink>
            </div>
          </div>
        </div>
      </main>

    </div>
  );
};

export default withApollo({ ssr: false })(Register);
