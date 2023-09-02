require 'openai'

class ResultsController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:regenerate_results]
  def api_call
    # input = params[:input]
    # client = OpenAI::Client.new
    # prompt = "generate 5 names for a #{input}"
    # response = client.chat(
    #   parameters: {
    #     model: 'gpt-3.5-turbo',
    #     messages: [{ "role": 'user', "content": prompt }],
    #     temperature: 0.7
    #   }
    # )
    # returned_result = response.dig('choices', 0, 'message', 'content').split(".")
    # @response = clean_result(returned_result)
    @response = ["result 1", "result 2", "result 3", "result 4", "result 5"]
  end

  def regenerate_results
    request_data = JSON.parse(request.body.read)
    render json: request_data.to_json
  end

  private

  def clean_result(array)
    clean_results = []
    array.each do |result|
      result.gsub!(/[\n\d]/, "")
      clean_string = result
      clean_results << clean_string
    end
    clean_results[1..-1]
  end
end
