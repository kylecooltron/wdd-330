



export default class PlayerInput {

  constructor(gameController, listeners = []) {
    this.listeners = [];
    this.gameController = gameController;
    this.apply_listeners(listeners);

    // handle mouse position
    this.mousePos = {x: 0, y: 0};
    this.previousMousePos = null;
    this.track_mouse_position();

    this.addLeaveWindowListener();
    this.addResizeWindowListener();

    this.wait_resize = null;
  }

  // getters
  mouse_x(){
    return this.mousePos.x;
  }
  mouse_y(){
    return this.mousePos.y;
  }
  mouse_pos(){
    return this.mousePos;
  }
  previous_mouse_pos(){
    return this.previousMousePos;
  }
  reset_previous_mouse_pos(){
    this.previousMousePos = null;
  }


  // this can probably be removed
  addLeaveWindowListener(){
    // create a generic listener on the document that will clear intervals if
    // the mouse leaves the window
    document.documentElement.addEventListener('mouseleave', () => {
      this.listeners.forEach(listener => {
        if(listener.mouseMoveListener){
          listener.mouseMoveListener = null;
          // call function when mouse hold ends
          listener.callend(listener.callparent);
        }
      });
    });
  }

  addResizeWindowListener(){
    window.addEventListener("resize", () => {
      clearTimeout(this.wait_resize);
      this.wait_resize = setTimeout(() => {
        this.gameController.windowResize();
      }, 200);
    });
  }

  reset_listeners(){
    this.listeners = [];
    // Note: may need to add code here to actually
    // remove the listeners from the canvas
    // or perhaps it will remove them when the canvas element is destroyed
  }

  apply_listeners(listeners){
    this.listeners.push(...listeners);
    // loop through list and creates listeners
    this.listeners.forEach(listener => {
      // special listener type for mouse holds on canvas
      if(listener.type == "hold"){
        this.apply_hold_listener(listener);
      }else{
        // any other listener type we need
          listener.element.addEventListener(listener.type, () => {
            listener.callback();
          })
      }
    });
  }

  apply_hold_listener(listener){
    // handle listeners for mouse clicking and holding

    ['mousedown','touchstart'].forEach( evt => 
      listener.element.addEventListener(evt, () => {
        if(!listener.mouseMoveListener){
          listener.mouseMoveListener = true;
          this.previousMousePos = null;
        }
      })
    );

    ['mouseup','touchend'].forEach( evt => 
      listener.element.addEventListener(evt, () => {
        if(listener.mouseMoveListener){
          listener.mouseMoveListener = null;
          // call function when mouse hold ends
          listener.callend(listener.callparent);
          this.reset_previous_mouse_pos();
        }
      })
    );


    // this can probably be removed
    listener.element.addEventListener('mouseleave', () => {
      if(listener.mouseMoveListener){
        listener.mouseMoveListener = null;
        // call function when mouse hold ends
        listener.callend(listener.callparent);
      }
    });

  }

  nextStarPattern(){
    // if pattern ends for any reason reset "hold" listeners
    this.listeners.forEach(listener => {
      if(listener.mouseMoveListener){
        listener.mouseMoveListener = null;
        // call function when mouse hold ends
        listener.callend(listener.callparent, false);
      }
    });
  }


  runCallbacks(){
    // run all hold listeners in our list
    this.listeners.forEach(listener => {
      if(listener.mouseMoveListener){
        listener.callback(listener.element, listener.callparent);
      }
    });
  }


  track_mouse_position(){
    let inputController = this;

    /* MOUSE DEVICES */
    document.onmousemove = function(e)
    {

      if(inputController.mousePos.x != 0 || inputController.mousePos.y != 0){
        inputController.previousMousePos = {
          x: inputController.mousePos.x,
          y: inputController.mousePos.y,
        };
      }
   
      
      inputController.mousePos.x = e.clientX;
      inputController.mousePos.y = e.clientY;

      inputController.runCallbacks();
    }

    /*    TOUCH SCREEN DEVICES    */
    document.ontouchmove = function(e)
    {

      let onelistener = false;

      inputController.listeners.forEach(listener => {
        if(listener.mouseMoveListener){
          onelistener = true;
        }
      });

      if(onelistener && inputController.gameController.game_state == "playing"){
      if(inputController.previousMousePos != null){
        if(inputController.mousePos.x != 0 || inputController.mousePos.y != 0){
          inputController.previousMousePos = {
            x: inputController.mousePos.x,
            y: inputController.mousePos.y,
          };
        }
      }
      inputController.mousePos.x = e.touches[0].clientX;
      inputController.mousePos.y = e.touches[0].clientY;

      if(inputController.previousMousePos == null){
        if(inputController.mousePos.x != 0 || inputController.mousePos.y != 0){
          inputController.previousMousePos = {
            x: inputController.mousePos.x,
            y: inputController.mousePos.y,
          };
        }
      }
    }else{
      inputController.previousMousePos = null;
    }

      inputController.runCallbacks();
    }

  }

}