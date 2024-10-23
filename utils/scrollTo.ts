export const ScrollTo = (link: string) => {
    const scrollInto = `${link.toLowerCase()}`;
    document.getElementById(scrollInto)?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

export default ScrollTo;