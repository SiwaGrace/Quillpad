import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchSubVisions } from "../../features/SubVisionSlice";
import SubVisionItem from "./SubVisionItem";
import logoLeaf from "../../assets/logo/quillpad_logo3.png";

const SubVisionList = () => {
  const dispatch = useDispatch();
  const { id: visionId } = useParams();

  const { items: subVisions, loading } = useSelector(
    (state) => state.subvisions,
  );

  useEffect(() => {
    dispatch(fetchSubVisions(visionId));
  }, [visionId, dispatch]);

  return (
    <div className="flex flex-col h-full">
      {/* Header Area */}
      <div className="relative flex justify-between items-start mb-6">
        {/* The Absolute Badge */}
        <div className="absolute -top-10 -right-2 flex items-center justify-center  rounded-3xl ">
          <span className="bg-primary-400 text-white text-[18px] font-black px-3 py-1 rounded-[50%] shadow-sm shadow-primary-400/20 border border-white dark:border-[#142d2a]">
            {subVisions.length}
          </span>
          {/* <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">
            Milestones
          </span> */}
        </div>

        <div className="flex flex-col">
          <h2 className="text-[#0d1c1b] dark:text-white text-lg font-bold flex items-center gap-2">
            <span className="material-symbols-outlined text-primary-400 text-xl">
              checklist
            </span>
            Sub-Visions
          </h2>
        </div>

        {/* Optional: A small "Quillpad" branding link or icon on the far right */}
        <div className="opacity-20 hover:opacity-100 transition-opacity">
          <img src={logoLeaf} className="h-4 w-auto grayscale" alt="branding" />
        </div>
      </div>

      {/* Main List Container */}
      <div className="flex flex-col gap-4">
        {loading ? (
          // Simple Skeleton Loader
          [1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-16 w-full bg-slate-100 dark:bg-slate-800 animate-pulse rounded-xl"
            />
          ))
        ) : subVisions.length > 0 ? (
          subVisions.map((sv) => <SubVisionItem key={sv._id} subVision={sv} />)
        ) : (
          <div className="py-10 px-4 border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-2xl text-center">
            <p className="text-slate-400 text-sm italic">
              No milestones defined yet.
            </p>
          </div>
        )}
      </div>

      {/* Add Button - Styled as a Dashboard Action */}
      <Link
        to={`/visions/${visionId}/subvision/create-subvision`}
        className="mt-6 group"
      >
        <button className="w-full flex items-center justify-center gap-3 py-3 border-2 border-dashed border-[#cee9e7] dark:border-[#1a3b38] rounded-xl text-sm font-bold text-primary-400 hover:bg-[#f0f9f8] dark:hover:bg-primary-400/5 hover:border-primary-400 transition-all duration-200">
          <img
            src={logoLeaf}
            className="h-6 w-auto grayscale group-hover:grayscale-0 transition-all"
            alt="logo"
          />
          <span>Add Milestone</span>
        </button>
      </Link>
    </div>
  );
};

export default SubVisionList;
