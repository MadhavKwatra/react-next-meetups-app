//domain.com/:meetupId

import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";
// ObjectId for converting string Id to ObjectId thing for mongoDB

import { useRouter } from "next/router";
import MeetupDetail from "../../components/meetups/MeetupDetail";
const MeetupDetails = (props) => {
  const router = useRouter();
  console.log(router.query, "HEY");
  const { meetupId } = router.query;

  return (
    <>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description} />
      </Head>
      <MeetupDetail meetupData={props.meetupData} />;
    </>
  );
};

// This tells NextJS for which dynamic parameter values this page should be pre rendered
export async function getStaticPaths() {
  // fetch ids from mongoDB
  const client = await MongoClient.connect(
    "mongodb+srv://madhav-kwat:56T86XSzgGT4SoxX@meetupsnextcluster.gkceqkw.mongodb.net/meetupsDB?retryWrites=true&w=majority"
  );

  const db = client.db();
  const meetupCollections = db.collection("meetups");

  const meetups = await meetupCollections.find({}, { _id: 1 }).toArray();
  // filter criteria (empty for all docs),which fields to get(only _id)

  client.close();
  return {
    // false when paths support all supported ids , when you enter any other then you get a 404 page
    // if set to true then that page is pregenerated on the server for you (😲)
    fallback: false,
    // Need to provide all dynamic pages routes here
    // paths: [
    //   {
    //     params: { meetupId: "m1" },
    //   },
    //   {
    //     params: { meetupId: "m2" },
    //   },
    //   {
    //     params: { meetupId: "m3" },
    //   },
    // ],

    // Dynamically providing dynamic pages
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

// Now here next js needs to generate pages for all ids
// As this is a dynamic page
export async function getStaticProps(context) {
  //   Cant access the query here using useRouter
  // can using this
  const meetupId = context.params.meetupId;
  console.log(meetupId);

  // fetch data from an api
  const client = await MongoClient.connect(
    "mongodb+srv://madhav-kwat:56T86XSzgGT4SoxX@meetupsnextcluster.gkceqkw.mongodb.net/meetupsDB?retryWrites=true&w=majority"
  );

  const db = client.db();
  const meetupCollections = db.collection("meetups");

  const meetup = await meetupCollections.findOne({ _id: ObjectId(meetupId) });
  client.close();
  return {
    props: {
      meetupData: {
        title: meetup.title,
        image: meetup.image,
        description: meetup.description,
        address: meetup.address,
        id: meetup._id.toString(),
      },
      // meetupData: meetup,
    },
  };
}
export default MeetupDetails;
