import RecomShow from "./RecomShow";
function RenderRecom(props) {
  const renderRecom = props.recom.map((recom) => {
    return (
      <div key={recom.id}>
        <RecomShow image={recom.album} />
        <p>{recom.name}</p>
      </div>
    );
  });
  return <div className="list card">{renderRecom}</div>;
}
export default RenderRecom;
