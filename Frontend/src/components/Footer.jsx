import { ImGithub } from "react-icons/im";
import { ImLinkedin } from "react-icons/im";
import { RiInstagramFill } from "react-icons/ri";

const Footer = () => {
  return (
    <>
      <footer className="w-full bg-emerald-950 text-white p-4 flex flex-col items-center">
        <div className="flex space-x-4 text-lg mb-2">
          <a href="https://www.github.com/" target="_blank" rel="noreferrer">
            <ImGithub/>
          </a>
          <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">
            <ImLinkedin/>
          </a>
          <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
            <RiInstagramFill/>
          </a>
        </div>
        <p className="text-sm">&copy; 2024 ExplorX. All Rights Reserved.</p>
      </footer>
    </>
  );
};

export default Footer;
