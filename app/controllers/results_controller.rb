class ResultsController < ApplicationController
  def api_call
    input = params[:input]
    redirect_to results_path
  end
end
