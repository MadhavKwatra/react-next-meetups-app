// domain.com

import { MongoClient } from "mongodb";
// This will not be included in the client side bundle

import { useEffect, useState } from "react";
import MeetupList from "../components/meetups/MeetupList";
import { Fragment } from "react";
import Head from "next/head";

const DUMMY_MEETUPS = [
  {
    id: "m1",
    title: "A first Meetup",
    image:
      "https://images.pexels.com/photos/1637802/pexels-photo-1637802.jpeg?cs=srgb&dl=pexels-marius-mann-1637802.jpg&fm=jpg&w=640&h=853",
    description: "This is the first meetup",
    address: "Some address 12,1234 street city",
  },
  {
    id: "m2",
    title: "A Second Meetup",
    image:
      "https://images.pexels.com/photos/1637802/pexels-photo-1637802.jpeg?cs=srgb&dl=pexels-marius-mann-1637802.jpg&fm=jpg&w=640&h=853",
    description: "This is the Second meetup",
    address: "Some address 12,1234 street city",
  },
  {
    id: "m3",
    title: "A third Meetup",
    image:
      "https://images.pexels.com/photos/257499/pexels-photo-257499.jpeg?cs=srgb&dl=pexels-pixabay-257499.jpg&fm=jpg&w=640&h=424",
    description: "This is the third meetup",
    address: "Some address 12,1234 street city",
  },
];

const Homepage = (props) => {
  console.log("Rendered");
  //   Dont need this now
  //   const [loadedMeetups, setLoadedMeetups] = useState([]);
  /* //   This will be executed after the component renders
  // therefore 2 component rerender cycles
  useEffect(() => {
    // Send http request and fetch data
    setLoadedMeetups(DUMMY_MEETUPS);
  }, []);
  // This all happens in the client side not the server

  //   Also this way NextJS doesnot pre render with the meetupItems in the list , it returns the first render version as the prerendered HTML code
  //   So we need to tell next js to prerender when some data arrives for which we have to wait */

  return (
    <Fragment>
      <Head>
        {/* A special component by Next ,where you can add all the elements of Head ,these will go to Head 🤩 */}
        <title>Next Meetups</title>

        {/* this description tag is used on search engines */}
        <meta
          name="description"
          content="Browse a huge list of highly active react meetups"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
};

// Static Site Generation
// This function is executed by next js before rendering above component (during the prerendering process)
// This function can only be in a page component
// this also can be async
// it waits until your data is loaded (until the promise resolves)
// It returns props to the above component
export async function getStaticProps() {
  // fetch data from an api
  const client = await MongoClient.connect(
    "mongodb+srv://madhav-kwat:56T86XSzgGT4SoxX@meetupsnextcluster.gkceqkw.mongodb.net/meetupsDB?retryWrites=true&w=majority"
  );

  const db = client.db();
  const meetupCollections = db.collection("meetups");

  const meetups = await meetupCollections.find().toArray();

  // find() returns all docs
  console.log(meetups);

  client.close();

  // Could run code that could only be run on the server
  // this code never runs on the client side
  // this gets executed only during the build process

  // Always need to return some specific data
  return {
    // this is needed
    props: {
      // its the props object sent to the component above
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        image: meetup.image,
        address: meetup.address,
        id: meetup._id.toString(),
      })),
      // Mapping coz _id giving error
    },
    revalidate: 3600,
    // This enables Incremental Static Generation i.e. the page is pre rendered on the server after seconds specified by this number
    // So no need of redeploying
  };
}

/* // Server Side Rendering
// This function is similar to above but it runs on every request
// it receives a context parameter , the static one too receives it
export async function getServerSideProps(context) {

    // similar to middleware in express
  // It contains info about the request and response
  const req = context.req;
  const res = context.res;

  console.log(req, "REQUEST");
  //   console.log(res, "RESPONSE");
  // fetch data from an api
  return {
    props: {
      meetups: DUMMY_MEETUPS,
    },
    // It dont have revalidate, but we dont need it here anyway
  };
} */

export default Homepage;
