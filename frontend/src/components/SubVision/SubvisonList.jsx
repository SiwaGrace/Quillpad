import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchSubVisions } from "../../features/SubVisionSlice";
// import SubVisionItem from "./SubVisionItem";
import logoLeaf from "../../assets/logo/quillpad_logo3.png";
import SubVisionItem from "./SubVisionItem";
// {
//   SubVisionItem;
// }
const SubVisionList = () => {
  const dispatch = useDispatch();
  const { id: visionId } = useParams();

  const { items: subVisions, loading } = useSelector(
    (state) => state.subvisions
  );

  useEffect(() => {
    dispatch(fetchSubVisions(visionId));
  }, [visionId]);

  return (
    <div className="pt-6">
      <div className="flex justify-between">
        <h2 className="text-xl font-bold text-teal-800 mb-4">
          Sub-Visions ({subVisions.length})
        </h2>

        <Link to={`/visions/${visionId}/subvision/create-subvision`}>
          <button className="text-primary-500 font-semibold flex items-center gap-2 hover:text-primary-600">
            <img src={logoLeaf} className="h-10" />
            <p>Add Sub-Vision</p>
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white">
        {loading ? (
          <p className="text-gray-500 italic">Loading...</p>
        ) : subVisions.length > 0 ? (
          subVisions.map((sv) => <SubVisionItem key={sv._id} subVision={sv} />)
        ) : (
          <p className="text-gray-500 italic sm:col-span-2">
            No sub-visions yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default SubVisionList;
