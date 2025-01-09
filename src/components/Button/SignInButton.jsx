import { ERROR_MESSAGE, MODAL_TYPE, SIGN_BUTTON_TYPE } from "../../config/constants";
import useBoundStore from "../../store/client/useBoundStore";
import SignOutIcon from "../Icon/SignOutIcon";
import ErrorModal from "../Modal/ErrorModal";
import Button from "../UI/Button";
import PropTypes from "prop-types";

const SignInButton = ({ type }) => {
  const isSignIn = useBoundStore((state) => state.isSignIn);
  const openModalTypeList = useBoundStore((state) => state.openModalTypeList);

  if (type === SIGN_BUTTON_TYPE.LANDING_PAGE) {
    return (
      <Button styles="flex-center px-12 py-6 font-semibold border-1 border-slate-400 bg-white rounded-[5px] text-black text-13 sm:text-18 transition duration-500 ease-in-out hover:text-white hover:bg-green-500 hover:shadow-md">
        <span id="signInButton">오늘 올라온 게시물 보기</span>
        {openModalTypeList[openModalTypeList.length - 1] === MODAL_TYPE.ERROR && (
          <ErrorModal errorMessage={ERROR_MESSAGE.SIGN_IN_ERROR} />
        )}
      </Button>
    );
  }

  return (
    <Button styles="flex-center px-8 py-4 md:px-12 md:py-6 font-medium border-1 border-slate-200 bg-white shadow rounded-[1px] text-black text-16 hover:bg-gray-200/30">
      {isSignIn ? (
        <>
          <SignOutIcon className="size-20 mr-5 md:size-25" />
          <span className="text-14 md:text-16">로그아웃</span>
        </>
      ) : (
        "로그인"
      )}
      {openModalTypeList[openModalTypeList.length - 1] === MODAL_TYPE.ERROR && (
        <ErrorModal errorMessage={ERROR_MESSAGE.SIGN_IN_ERROR} />
      )}
    </Button>
  );
};

export default SignInButton;

SignInButton.propTypes = {
  type: PropTypes.string,
};
