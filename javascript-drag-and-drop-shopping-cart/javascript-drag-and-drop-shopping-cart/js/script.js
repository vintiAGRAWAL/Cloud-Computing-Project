//Begin by creating all work into a function to be loaded later
function addDnDHandlers() {
  
  /*
  
  Before you begin, add to each movable item, the attribute and property 
      <li draggable="true">Item Name</li>
  
   STEP 1: Grab the following three items
      -An array of all shopping items using getElementsByClassName
      -The specific area to drop the items in (shopping cart)
      -An area to display the shopping cart list after being dropped
   */
  
  let shoppingItems = document.getElementsByClassName('store-product');
  let shoppingCartDrop = document.getElementById('shoppingcart');
  let shoppingCart = document.querySelectorAll('#shoppingcart ul')[0];

//------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------

  /*
  
    STEP 2: Create an eventListener to each item that will pull data of 
    the specific item:
    
      -Grab the info (in this case, multiple values)
      -Assign the type of dataTransfer to copy
      -Append the data to the dataTransfer
      -NOTE: the dataTransfer will ALWAYS be in a STRING, stringify.JSON will
             make it easier to convert multiple values.
             
  */
  
  for(var i = 0; i < shoppingItems.length; i++) {
    shoppingItems[i].addEventListener("dragstart", function(e) {
      
      //Pull all the data you need into a JSON format from current item
      var itemName = this.innerHTML; 
      var getinfo = {'name': itemName, 'id': this.getAttribute("id")};
      var str = JSON.stringify(getinfo); 
      
      //Specifies the dataTransfer
      e.dataTransfer.effectAllowed = "copy";
      //Specifies the data type to be copied (will be a STRING!!!!)
      e.dataTransfer.setData("Text", str);
      //Set EventListener's 'useCapture' to false (set this for best practices)
    }, false);
  }

//------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------
  
  /*
    STEP 3: Create an eventListener on e drop Zone (this is the process of moving
    data over to another area):
      -Prevent the default of the dragover (by default, sets current drag operation to 'none')
        Type deleting the preventDefaults to test this out
      -Assign the effect when the item is dropped (the effectAllowed vale must be the same or 
      set to 'all')
  */
  
  shoppingCartDrop.addEventListener("dragover", function(e) {
    
    //By default, the drop effect is set to 'none'. change by using this:
    if (e.preventDefault)
        e.preventDefault();
    
    //Ensure the dropEffect remains as 'copy'
    e.dataTransfer.dropEffect = "copy";
    
    //Prevents bubbling through the DOM
    return false;
    
  }, false);
  
//------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------
  
  /*
    STEP 4: Create an eventListener for when the item is dropped
      -Prevent propagation through drops
      -Convert the JSON data from dataTransfer into an object; assign variables to each
      -Assign the variables to a function that will append to the shopping cart list
  */
  
  shoppingCartDrop.addEventListener("drop", function(e) {
    
    //Prevents capturing/bubbling phases (not to be confused with preventDefault)
    if (e.stopPropagation)
      e.stopPropagation();
    
    //Retrieve all data from JSON into their own variables
    var obj = JSON.parse(e.dataTransfer.getData("Text"));
    var itemName = obj.name;
    var itemId = obj.id;
    
    //This function will append the item onto the shopping cart screen
    addItemToCart(itemName, itemId);
    
    //Prevents capturing/bubbling phases (not to be confused with preventDefault)
    e.stopPropagation();
    return false;
  }, false);
  
//------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------
  
  /*
    STEP 5: Append the dropped data into the shopping cart
      -Create a new 'li' node
      -Add the items content to the node
      -Add the item's id with unique identifier to the node
        -NOTE: use querySelectAll to get the LIVE number of lists. className will
        always remain as 0.
      -Append the new node to the 'ul' within the shopping cart list
  */ 
  
  function addItemToCart(item, id) {
    
    //Create a new list node
    var newItem = document.createElement('li');
    
    //Append the name of the item at HTML text
    newItem.innerHTML = item;
    
    //Append the item's id with a unique ID
    var itemNum = document.querySelectorAll('#cartlist li').length + 1;
    newItem.setAttribute('id', 'item-' + itemNum + '-' + id);
    
    //Add the item to the shopping cart list
    shoppingCart.appendChild(newItem);
    
  }
    
}

//Initiate the drag and drop when ALL content is loaded
document.addEventListener("DOMContentLoaded", addDnDHandlers, false);