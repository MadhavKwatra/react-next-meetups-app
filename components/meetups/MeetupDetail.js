import classes from "./MeetupDetail.module.css";

const MeetupDetail = ({ meetupData }) => {
  return (
    <section className={classes.detail}>
      <img
        src={meetupData.image}
        alt={meetupData.title}
        className={classes.image}
      />
      <h1>{meetupData.title}</h1>
      <address>{meetupData.address}</address>
      <p>{meetupData.description}</p>
    </section>
  );
};
export default MeetupDetail;
