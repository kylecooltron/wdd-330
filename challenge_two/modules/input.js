



export default class PlayerInput {

  constructor(listeners = []) {
    this.listeners = [];
    this.apply_listeners(listeners);

    // handle mouse position
    this.mousePos = {x: 0, y: 0};
    this.previousMousePos = null;
    this.track_mouse_position();

    this.addLeaveWindowListener();
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

  addLeaveWindowListener(){
    // create a generic listener on the document that will clear intervals if
    // the mouse leaves the window
    document.documentElement.addEventListener('mouseleave', () => {
      this.listeners.forEach(listener => {
        if(listener.mouseMoveListener){
          listener.mouseMoveListener = null;
        }
      });
    });
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
    listener.element.addEventListener('mousedown', () => {
      if(!listener.mouseMoveListener){
        listener.mouseMoveListener = true;
      }
    });

    listener.element.addEventListener('mouseup', () => {
      if(listener.mouseMoveListener){
        listener.mouseMoveListener = null;
      }
    });

    listener.element.addEventListener('mouseleave', () => {
      if(listener.mouseMoveListener){
        listener.mouseMoveListener = null;
      }
    });
    
    listener.element.addEventListener('mouseleave', () => {
      const rect = listener.element.getBoundingClientRect();
      const threshold = 4;
      if( this.mousePos.x <= rect.left + threshold 
        || this.mousePos.y <= rect.top + threshold 
        || this.mousePos.x >= rect.right - threshold 
        || this.mousePos.y >= rect.bottom - threshold
      ){
        if(listener.mouseMoveListener){
          listener.mouseMoveListener = null;
        }
      }
    });
  }


  runCallbacks(){
    this.listeners.forEach(listener => {
      if(listener.mouseMoveListener){
        listener.callback(listener.element, listener.callparent);
      }
    });
  }




  track_mouse_position(){
    let inputController = this;
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
  }


}