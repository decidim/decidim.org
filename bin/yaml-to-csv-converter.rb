#!/usr/bin/env ruby
require "yaml"
require "csv"
require "json"
require "optparse"

class YamlToCsvConverter
  attr_reader :input_pattern, :output_path, :records

  def initialize(input_pattern, output_path)
    @input_pattern = input_pattern
    @output_path = output_path
    @records = []
  end

  def convert
    load_yaml_files
    headers = collect_headers
    write_csv(headers)
    puts "CSV written to #{output_path}"
  end

  private

  def load_yaml_files
    files = Dir.glob(input_pattern)
    abort "No files found matching pattern: #{input_pattern}" if files.empty?

    @records = files.map { |file| YAML.load_file(file) }
    puts "Loaded #{@records.size} YAML file(s)"
  end

  def collect_headers
    headers = records.flat_map(&:keys).uniq

    if headers.include?("location")
      headers.delete("location")
      headers += ["lat", "lon"]
    end

    headers
  end

  def write_csv(headers)
    CSV.open(output_path, "w", force_quotes: true) do |csv|
      csv << headers
      records.each do |record|
        csv << extract_row_data(record, headers)
      end
    end
  end

  def extract_row_data(record, headers)
    headers.map do |header|
      case header
      when "lat", "lon"
        extract_coordinate(record, header)
      else
        record[header]
      end
    end
  end

  def extract_coordinate(record, coordinate_type)
    location = record["location"]
    return "" unless location

    parsed = JSON.parse(location)
    coordinates = parsed["coordinates"]
    coordinate_type == "lon" ? coordinates[0] : coordinates[1]
  rescue JSON::ParserError, StandardError
    ""
  end
end

def parse_arguments
  options = {
    input: "./data/installations/*.yml",
    output: "./source/uploads/installations.csv"
  }

  OptionParser.new do |opts|
    opts.banner = "Usage: convert.rb [options]"

    opts.on("-i", "--input PATTERN", "Input file pattern (default: *.yml)") do |pattern|
      options[:input] = pattern
    end

    opts.on("-o", "--output PATH", "Output CSV file path (default: output.csv)") do |path|
      options[:output] = path
    end

    opts.on("-h", "--help", "Show this help message") do
      puts opts
      exit
    end
  end.parse!

  options
end

if __FILE__ == $PROGRAM_NAME
  options = parse_arguments
  converter = YamlToCsvConverter.new(options[:input], options[:output])
  converter.convert
end
