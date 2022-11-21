



export default class PlayerInput {

  constructor(listeners) {
    this.listeners = listeners;
    this.apply_listeners();

    // handle mouse position
    this.mousePos = {x: 0, y: 0};
    this.track_mouse_position();
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