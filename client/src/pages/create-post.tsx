import { Box, Button } from "@chakra-ui/core";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import { InputField } from "../components/InputField";
import { Layout } from "../components/Layout";
import { useCreatePostMutation } from "../generated/graphql";
import { useIsAuth } from "../utils/useIsAuth";
import { withApollo } from "../utils/withApollo";

interface сreatePostProps { }

const CreatePost: React.FC<сreatePostProps> = ({ }) => {
  const router = useRouter();
  useIsAuth();
  const [createPost] = useCreatePostMutation();
  return (
    <Layout variant="small">
      <Formik
        initialValues={{ title: "", text: "", subtitle: "", poster: "" }}
        onSubmit={
          async (values) => {
            const { errors } = await createPost({
              variables: { input: values },
              update: (cache) => {
                cache.evict({ fieldName: "posts:{}" });
              },
            });
            if (!errors) {
              router.push("/");
            }
          }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField name="title" placeholder="title" label="Заголовок" />
            <InputField name="subtitle" placeholder="title" label="Заголовок на англиском" />
            <InputField name="poster" placeholder="poster" label="Картинка" />

            <Box mt={4}>
              <InputField
                textarea
                name="text"
                placeholder="description"
                label="Описание"
              />
            </Box>

            {/* <InputField name="time_seria" placeholder="time" label="Продолжительность серии" /> */}

            <Button
              mt={4}
              type="submit"
              isLoading={isSubmitting}
              variantColor="teal"
            >
              Создать
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withApollo({ ssr: false })(CreatePost);
