let defaultState = {
  selectedItems: { items: [], restaurantName: "" },
};

let cartReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      let newState = { ...state };

      if (action.payLoad.checkboxvalue) {
        console.log("ADD TO CART");

        newState.selectedItems = {
          items: [...newState.selectedItems, action.payLoad],
          restaurantName: action.payLoad.restaurantName,
        };
      } else {
        console.log("REMOVE FROM CART");
        newState.selectedItems = {
          items: [
            ...newState.selectedItems.items.filter(
              (item) => item.title == action.payLoad.title
            ),
          ],
          restaurantName: action.payLoad.restaurantName,
        };
      }
      console.log(newState);
      return newState;
    }

    default:
      return state;
  }
};

export default cartReducer;
