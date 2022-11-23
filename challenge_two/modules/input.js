



export default class PlayerInput {

  constructor(listeners) {
    this.listeners = listeners;
    this.apply_listeners();

    // handle mouse position
    this.mousePos = {x: 0, y: 0};
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

  addLeaveWindowListener(){
    // create a generic listener on the document that will clear intervals if
    // the mouse leaves the window
    document.documentElement.addEventListener('mouseleave', () => {
      this.listeners.forEach(listener => {
        if(listener.interval){
          clearInterval(listener.interval);
          listener.interval = null;
        }
      });
    });
  }

  apply_listeners(){
    // loop through list and creates listeners
    this.listeners.forEach(listener => {
      // special listener type for mouse holds on canvas
      if(listener.type == "hold"){
        listener.element.addEventListener('mousedown', () => {
          if(!listener.interval){
            listener.interval = setInterval(() => {
              listener.callback(listener.element, listener.callparent);
            }, 10);
          }

        })
        listener.element.addEventListener('mouseup', () => {
          if(listener.interval){
            clearInterval(listener.interval);
            listener.interval = null;
          }
        })
        listener.element.addEventListener('mouseleave', () => {
          const rect = listener.element.getBoundingClientRect();
          const threshold = 4;
          if( this.mousePos.x <= rect.left + threshold 
            || this.mousePos.y <= rect.top + threshold 
            || this.mousePos.x >= rect.right - threshold 
            || this.mousePos.y >= rect.bottom - threshold
          ){
            if(listener.interval){
              clearInterval(listener.interval);
              listener.interval = null;
            }
          }
        })
      }else{
        // any other listener type we need
          listener.element.addEventListener(listener.type, () => {
            listener.callback();
          })
      }
    });
  }

  track_mouse_position(){
    let inputController = this;
    document.onmousemove = function(e)
    {
      inputController.mousePos.x = e.clientX;
      inputController.mousePos.y = e.clientY;
    }
  }


}