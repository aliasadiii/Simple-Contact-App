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
  const newDisplayed = [];
  const fullNames = displayedContacts.map((contact) => contact.fullName).sort();
  fullNames.forEach((name) => {
    newDisplayed.push(
      displayedContacts.find((contact) => contact.fullName === name),
    );
  });
  return newDisplayed;
};

const sortByDate = (displayedContacts, dateFormat) => {
  const sortedContacts = [];
  const creationTimes = displayedContacts
    .map((contact) => contact.creationTime)
    .sort((a, b) => {
      if (dateFormat === "SortbyNewest") return b - a;
      else return a - b;
    });
  creationTimes.forEach((date) =>
    sortedContacts.push(
      displayedContacts.find((contact) => contact.creationTime === date),
    ),
  );
  return sortedContacts;
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
