import Loader from "./Loader";

const Loading = async () => {
//   await new Promise((resolve) => setTimeout(resolve, 1000));
  alert("done")
  console.log("loading");
  
  return (
    <section
      className="
          bg-surface
          border border-border
          rounded-2xl
          shadow-card
          p-6   
          flex
          items-center gap-3
        "
    >
      Loading...
      <Loader borderColor="border-textPrimary" />
    </section>
  );
};

export default Loading;
