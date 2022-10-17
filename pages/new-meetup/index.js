// domain.com/new-meetup
import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import { useRouter } from "next/router";

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
  return <NewMeetupForm onAddMeetup={addMeetupHandler} />;
};
export default NewMeetupPage;
