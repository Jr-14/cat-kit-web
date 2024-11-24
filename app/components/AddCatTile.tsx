import React, { PropsWithChildren } from "react";
import { Link } from "@remix-run/react";
import { CatDetails } from "~/model/CatsModel";

// const TileCat: React.FC<Props> = ({ cat }) => {
//   return (
//     <div className="tile-cat">
//       {/* <Link to={`/cats/${cat.id}`} reloadDocument>{`It's ${cat.name}`}</Link> */}
//       <Link to={`/cats/${cat.id}`}>
//         {cat.image && (
//           <img src={cat.image} alt={cat.name} width="300" height="300" />
//         )}
//         <p>{`${cat.name}`}</p>
//       </Link>
//     </div>
//   );
// };
//
// export default TileCat;

type Props = PropsWithChildren<{}>;

const AddCatTile: React.FC = ({

} : Props
) => {
  return (
      <button className="tile-add-cat enlarge-on-hover" type="submit">
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6 12H18M12 6V18" stroke="#555555" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
        <p>
          Add a cat
        </p>
      </button>
  );
};

export default AddCatTile;
