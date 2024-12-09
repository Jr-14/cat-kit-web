import React from "react";
import { Link } from "@remix-run/react";
import { CatDetail } from "~/schemas/catSchema";
import CatPlaceholderIcon from "./svg/CatPlaceholderIcon";

type Props = {
  cat: CatDetail;
};

const TileCat: React.FC<Props> = ({ cat }) => {
  return (
    <div className="tile enlarge-on-hover">
      <Link to={`/cats/${cat.id}`}>
        {cat.image ? (
          <img src={cat.image} alt={cat.name} width="300" height="300" />
        ) : (
          <CatPlaceholderIcon />
        )}
        <p>{`${cat.name}`}</p>
      </Link>
    </div>
  );
};

export default TileCat;
