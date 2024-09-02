# Twitter Like II

## Problem Description

![Demo](solutions/react-ts/public/images/demo.png)

The basic Twitter like button can be visually dull without animation. Building on the first Twitter like challenge, your task is to add animation to the button. Additionally, implement a like counter that starts at 32.

## Requirements

- Animate the like button when clicked
- Display a like counter starting at 32
- Increment/decrement the counter appropriately when liked/unliked
- Handle spam clicking (rapid like/unlike actions) without breaking functionality
- Maintain all functionality from the original Twitter Like component
- Ensure the component is reusable and customizable

## Implementation Details

- Use React hooks for state management
- Implement smooth CSS transitions for the like animation

## Example Usage

Here's an example of how to use the `LikeButton` component:

```jsx
const [isLiked, setIsLiked] = useState(false);
  
<LikeButton isLiked={isLiked} setIsLiked={setIsLiked} />
```

## Props

The `LikeButton` component accepts the following props:

- `isLiked` (boolean): The current like state
- `setIsLiked` (function): A function to update the like state

## Assets

You could use this background with animated heart frames:

```
https://abs.twimg.com/a/1446542199/img/t1/web_heart_animation.png
```