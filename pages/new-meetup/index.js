// domain.com/new-meetup
import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import { useRouter } from "next/router";
import Head from "next/head";

const NewMeetupPage = () => {
  const router = useRouter();

  const addMeetupHandler = async (enteredMeetupData) => {
    console.log(enteredMeetupData);

    // Sending the http request
    // internally i.e. to the same website
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(enteredMeetupData),
    });

    const data = await response.json();
    console.log(data, "Data");

    // Navigating away programmatically
    router.replace("/");
  };
  return (
    <>
      <Head>
        {/* A special component by Next ,where you can add all the elements of Head ,these will go to Head 🤩 */}
        <title>Add a New Meetup</title>
        <meta
          name="description"
          content="Add your own meetups and create amazing networking opportunities"
        />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />;
    </>
  );
};
export default NewMeetupPage;
