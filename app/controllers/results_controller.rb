require 'openai'

class ResultsController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:regenerate_results]
  def api_call
    input = params[:input]
    prompt = "generate 5 names for a #{input}"
    @response = make_api_request(prompt)
    @input = params[:input]
  end

  def regenerate_results
    request_data = JSON.parse(request.body.read)
    input = request_data['input']
    results = request_data['results'].values[0]
    number_to_generate = 5 - results.length
    results_joined = results.join(" and ")
    prompt = "generate #{number_to_generate} names for a #{input}. I don't want the names #{results_joined} to be included."
    response = make_api_request(prompt)
    render json: response.to_json
  end

  private

  def make_api_request(prompt)
    client = OpenAI::Client.new
    response = client.chat(
      parameters: {
        model: 'gpt-3.5-turbo',
        messages: [{ "role": 'user', "content": prompt }],
        temperature: 0.7
      }
    )
    returned_result = response.dig('choices', 0, 'message', 'content').split('.')
    clean_result(returned_result)
  end

  def clean_result(array)
    array.map { |result| result.gsub(/[\n\d]/, '') }[1..-1]
  end
end
