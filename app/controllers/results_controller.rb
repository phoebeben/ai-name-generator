require 'openai'

class ResultsController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:regenerate_results]
  def api_call
    input = params[:input]
    client = OpenAI::Client.new
    prompt = "generate 5 names for a #{input}"
    response = client.chat(
      parameters: {
        model: 'gpt-3.5-turbo',
        messages: [{ "role": 'user', "content": prompt }],
        temperature: 0.7
      }
    )
    returned_result = response.dig('choices', 0, 'message', 'content').split('.')
    @response = clean_result(returned_result)
    @input = params[:input]
  end

  def regenerate_results
    request_data = JSON.parse(request.body.read)
    input = request_data['input']
    results = request_data['results'].values[0]
    number_to_generate = 5 - results.length
    results_joined = results.join(" and ")
    prompt = "generate #{number_to_generate} names for a #{input}. I don't want the names #{results_joined} to be included."
    client = OpenAI::Client.new
    response = client.chat(
      parameters: {
        model: 'gpt-3.5-turbo',
        messages: [{ "role": 'user', "content": prompt }],
        temperature: 1
      }
    )
    returned_result = response.dig('choices', 0, 'message', 'content').split('.')
    response = clean_result(returned_result)
    render json: response.to_json
  end

  private

  def clean_result(array)
    clean_results = []
    array.each do |result|
      result.gsub!(/[\n\d]/, '')
      clean_string = result
      clean_results << clean_string
    end
    clean_results[1..-1]
  end
end
