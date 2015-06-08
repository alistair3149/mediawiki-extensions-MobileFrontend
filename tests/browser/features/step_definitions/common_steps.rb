Given /^I am in beta mode$/ do
  visit(MainPage) do |page|
    page_uri = URI.parse(page.page_url_value)

    # A domain is explicitly given to avoid a bug in earlier versions of Chrome
    browser.cookies.add 'mf_useformat', 'true', domain: page_uri.host
    browser.cookies.add 'optin', 'beta', domain: page_uri.host

    page.refresh
  end
end

Given /^I am logged in as a new user$/ do
  step 'I am on the "Main Page" page'
  step 'I click on "Log in" in the main navigation menu'
  # FIXME: Actually create a new user instead of using an existing one
  on(SpecialUserLoginPage).login_with('Selenium_newuser', password)
end

Given(/^I am logged in as a user with a > (\d+) edit count$/) do
  step 'I am on the "Main Page" page'
  step 'I click on "Log in" in the main navigation menu'
  # FIXME: Guarantee that MEDIAWIKI_USER has an edit count of > 0
  on(SpecialUserLoginPage).login_with(user, password)
end

Given(/^I am logged into the mobile website$/) do
  step 'I am using the mobile site'
  visit(LoginPage).login_with(user, password, false)
end

Given(/^I am on a page that does not exist$/) do
  name = 'NewPage' + Time.now.to_i.to_s
  visit(ArticlePage, using_params: { article_name: name })
end

Given(/^I am on the random page$/) do
  visit(ArticlePage, using_params: { article_name: @random_string })
end

Given(/^I am on the sign-up page$/) do
  visit(SpecialUserLoginPage).create_account_link_element.when_present.click
end

Given(/^I am on the "(.+)" page$/) do |article|
  # Ensure we do not cause a redirect
  article = article.gsub(/ /, '_')
  visit(ArticlePage, using_params: { article_name: article })
end

Given(/^I am using the mobile site$/) do
  visit(MainPage) do |page|
    browser.cookies.add 'mf_useformat', 'true', domain: URI.parse(page.page_url_value).host

    page.refresh
  end
end

Given(/^I am viewing the site in mobile mode$/) do
  browser.window.resize_to(320, 480)
end

Given(/^I am viewing the site in tablet mode$/) do
  # Use numbers significantly larger than 768px to account for browser chrome
  browser.window.resize_to(1280, 1024)
end

Given(/^I choose to create an account$/) do
  on(SpecialUserLoginPage).create_account_link_element.when_present.click
end

Given(/^my browser doesn't support JavaScript$/) do
  browser_factory.override(browser_user_agent: 'Opera/9.80 (J2ME/MIDP; Opera Mini/9.80 (S60; SymbOS; Opera Mobi/23.348; U; en) Presto/2.5.25 Version/10.54')
end

Given(/^the "(.*?)" page is protected\.$/) do |page|
  api.protect_page(page, 'MobileFrontend Selenium test protected this page')
end

When(/^I click the browser back button$/) do
  on(ArticlePage).back
end

When(/^I say Cancel in the confirm dialog$/) do
  on(ArticlePage).confirm(false) {}
end

When(/^I say OK in the confirm dialog$/) do
  on(ArticlePage).confirm(true) do
  end
end

When(/^I visit the page "(.*?)" with hash "(.*?)"$/) do |article, hash|
  # Ensure we do not cause a redirect
  article = article.gsub(/ /, '_')
  visit(ArticlePage, using_params: { article_name: article, hash: hash })
end

Then(/^there should be a red link with text "(.+)"$/) do |text|
  # FIXME: Switch to link_element when red links move to stable
  expect(on(ArticlePage).content_wrapper_element.link_element(text: text).when_present(10)).to be_visible
end
