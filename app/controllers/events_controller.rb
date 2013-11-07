class EventsController < ApplicationController
  
  def new
    @post = Event.new
  end
  
  def index
    @posts = Event.all
  end
  
  def create
    @post = Event.new(post_params)
  end
  
  def remove
    @post = Event.destoy
  end
  
  private
  def post_params
    params.require(events).permit(:time, :description, :date)
  end
  
end
