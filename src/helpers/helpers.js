const formatText = (text) => {
  return text.split(" ").join("");
};

const makeRandomID = () => {
  const date = new Date().getTime();
  return Math.floor(Math.random() * 10000 * date);
};

const creationTime = () => {
  return new Date().getTime();
};

const sortByName = (displayedContacts) => {
  if (!Array.isArray(displayedContacts)) return [];
  return [...displayedContacts].sort((a, b) => {
    const nameA = (a?.fullName || "").toString();
    const nameB = (b?.fullName || "").toString();
    return nameA.localeCompare(nameB, undefined, { sensitivity: "base" });
  });
};

const sortByDate = (displayedContacts, dateFormat) => {
  if (!Array.isArray(displayedContacts)) return [];
  const descending = dateFormat === "SortbyNewest";
  return [...displayedContacts].sort((a, b) => {
    const ta = Number(a?.creationTime) || 0;
    const tb = Number(b?.creationTime) || 0;
    return descending ? tb - ta : ta - tb;
  });
};

const showSnackBar = (item) => {
  const addToast = document.getElementById(item);
  addToast.classList.add("show");
  setTimeout(() => {
    addToast.classList.remove("show");
  }, 3000);
};

export {
  formatText,
  sortByName,
  makeRandomID,
  creationTime,
  sortByDate,
  showSnackBar,
};
