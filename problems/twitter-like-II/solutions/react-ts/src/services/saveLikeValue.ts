export default async (newLikeValue: boolean) => {
  return new Promise((resolve) => {
    console.log("Save request sent");
    // Mock request to "save" like status after 100 milliseconds
    setTimeout(() => {
      localStorage.setItem("liked", JSON.stringify(newLikeValue));
      console.log("Save request done");
      resolve(newLikeValue);
    }, 100);
  });
};
