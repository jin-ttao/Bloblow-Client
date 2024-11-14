import { useState } from "react";

import asyncGetPostCountList from "../../../api/keyword/asyncGetPostCountList";
import { getCursorDate } from "../../../utils/date";
import LineChart from "../../Chart/LineChart";
import PeriodPagination from "../../Pagination/PeriodPagination";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import PropTypes from "prop-types";

const PeriodPostCountCard = ({ keywordId }) => {
  const [cursorId, setCursorId] = useState(() => getCursorDate());

  const {
    data: chartData,
    isPlaceholderData,
    isError,
  } = useQuery({
    queryKey: ["postCount", keywordId, cursorId],
    queryFn: () => asyncGetPostCountList(keywordId, cursorId),
    placeholderData: keepPreviousData,
  });

  if (chartData === undefined) {
    return null;
  }

  if (isError || chartData?.message?.includes("Error occured")) {
    return (
      <div className="w-1/2 h-full min-h-300 p-10 border-2 rounded-md flex justify-center items-center">
        주간 게시물 차트를 불러오는 데 실패했습니다.
      </div>
    );
  }

  return (
    <article className="flex flex-col gap-6 w-full h-full p-10 border-2 rounded-md">
      <span className="flex-shrink-0 bg-green-100/20 px-10 py-5 rounded-[2px]">주간 게시물 수</span>
      <div className="flex-col-center">
        <LineChart chartData={chartData} />
        <PeriodPagination
          chartData={chartData}
          setCursorId={setCursorId}
          isPlaceholderData={isPlaceholderData}
        />
      </div>
    </article>
  );
};

export default PeriodPostCountCard;

PeriodPostCountCard.propTypes = {
  keywordId: PropTypes.string.isRequired,
};
