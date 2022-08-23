const Footer = ({ galleryInfo }) => {
  return (
    <div className="galleryFooter bg-black">
      <p>
        {galleryInfo}
        <span className="bg-red-700 text-red-800 text-2xl font-medium ml-7 px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-red-900">
          🤘
        </span>
      </p>
    </div>
  );
};

export default Footer;
