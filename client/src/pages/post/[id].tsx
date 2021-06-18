import React from "react";
import { Layout } from "../../components/Layout";
import { Heading, Box, Image } from "@chakra-ui/core";
import { useGetPostFromUrl } from "../../utils/useGetPostFromUrl";
import { EditDeletePostButtons } from "../../components/EditDeletePostButtons";
import { withApollo } from "../../utils/withApollo";

import classes from '../../style/postID.module.scss'


const Post = ({ }) => {
  const { data, error, loading } = useGetPostFromUrl();

  if (loading) {
    return (
      <Layout>
        <div>Загрузка ...</div>
      </Layout>
    );
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  if (!data?.post) {
    return (
      <Layout>
        <Box>Не удалось найти Post</Box>
      </Layout>
    );
  }

  return (
    <Layout>
      <EditDeletePostButtons
        id={data.post.id}
        creatorId={data.post.creator.id}
      />
      <div className={classes.post_container}>

        <div className={classes.post_colum}>
          <div className={classes.post_poster}>
            <Image src={data.post.poster} alt={data.post.title + " (" + data.post.subtitle + ")"} />
          </div>
        </div>

        <div className={classes.post_colum}>
          <div className={classes.post_description}>
            <Heading mb={4}>{data.post.title}</Heading>
            <div>{data.post.subtitle}</div>
          </div>
        </div>
      </div>
      <Box mb={4}>{data.post.text}</Box>
    </Layout>
  );
};

export default withApollo({ ssr: true })(Post);
