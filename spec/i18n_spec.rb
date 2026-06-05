# frozen_string_literal: true

require "i18n/tasks"
require "i18n/backend/fallbacks"

RSpec.describe I18n do
  let(:locales) do
    ENV["ENFORCED_LOCALES"].presence || "en"
  end

  let(:i18n) { I18n::Tasks::BaseTask.new(locales: locales.split(",")) }

  let(:missing_keys) { i18n.missing_keys }
  let(:unused_keys) { i18n.unused_keys }
  let(:inconsistent_interpolations) { i18n.inconsistent_interpolations }

  it "does not have missing keys" do
    expect(missing_keys).to be_empty,
                            "Missing #{missing_keys.leaves.count} i18n keys, run `i18n-tasks missing' to show them"
  end

  it "does not have unused keys" do
    expect(unused_keys).to be_empty,
                           "#{unused_keys.leaves.count} unused i18n keys, run `i18n-tasks unused' to show them"
  end

  it "files are normalized" do
    non_normalized = i18n.non_normalized_paths
    error_message = "The following files need to be normalized:\n" \
                    "#{non_normalized.map { |path| "  #{path}" }.join("\n")}\n" \
                    "Please run `i18n-tasks normalize' to fix"
    expect(non_normalized).to be_empty, error_message
  end

  it "does not have inconsistent interpolations" do
    error_message = "#{inconsistent_interpolations.leaves.count} i18n keys have inconsistent interpolations.\n" \
                    "Run `i18n-tasks check-consistent-interpolations' to show them"
    expect(inconsistent_interpolations).to be_empty, error_message
  end

  context "with fallbacks enabled" do
    before do
      described_class.backend.store_translations(:en, fallback_test: { missing_key: "English fallback value" })
    end

    it "returns the localised string when the translation exists in the current locale" do
      expect(described_class.t("404.title", locale: :es)).not_to match(/translation missing/)
    end

    it "falls back to English when the translation is missing in the current locale" do
      [:es, :eu, :ca, :cs, :fr, :de, :hu, :ja, :ro, :fi, :"pt-BR"].each do |locale|
        expect(described_class.t("fallback_test.missing_key", locale:))
          .to eq("English fallback value"),
              "Expected #{locale} to fall back to English for a missing key"
      end
    end
  end
end
