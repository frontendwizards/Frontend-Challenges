# Twitter like Challenge

## Problem Description

Create a "like button" component similar to the one used in Twitter tweets. The button should be initially set to "false" and can be toggled by clicking on it.

![File Tree Demo](solutions/react-ts/public/images/demo.png)

## Requirements

- Implement a debounce mechanism to prevent unnecessary requests.
- Make debounce from scratch
- Simulate saving the "like" status by sending a mock request to a backend or using local storage.
- If the value doesn't change, avoid sending a mock request.
- Handle errors if the mock request fails: log the error and reset the like state.
- Ensure that the "like" status persists on page reload.

## Example

Here's an example of how the component might be used:

```tsx
<LikeButton isLiked={isLiked} setIsLiked={setIsLiked} />
```

The LikeButton component should:

- Toggle between "liked" and "unliked" states on click.
- Show a visual indication of the current state.
- Debounce requests to prevent excessive server calls.

## Live Demo

[Check out the live demo here](#)