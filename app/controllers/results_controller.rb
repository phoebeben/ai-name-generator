require 'openai'

class ResultsController < ApplicationController
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
    @response = response.dig('choices', 0, 'message', 'content')
  end
    # response = client.ChatCompletetion.create(
    #   parameters: {
    #     model: 'gpt-3.5-turbo',
    #     messages: [
    #       {
    #         "role": 'user',
    #         "content": prompt
    #       }
    #     ],
    #     temperature: 0.6
    #   }
    # )
    # puts response.dig('choices', 0, 'message', 'content')
end
