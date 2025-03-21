export function useTitle() {
    const updateTitle = (title) => {
      document.title = title;
    };
  
    return { updateTitle };
}
  