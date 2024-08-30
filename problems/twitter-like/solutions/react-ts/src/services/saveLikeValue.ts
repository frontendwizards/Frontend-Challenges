export default async (newLikeValue: boolean) => {
  return new Promise((resolve) => {
    console.log("request sent sent");
    // Mock request to "save" like status after 100 milliseconds
    setTimeout(() => {
      localStorage.setItem("liked", JSON.stringify(newLikeValue));
      console.log("save request done");
      resolve(newLikeValue);
    }, 100);
  });
};
