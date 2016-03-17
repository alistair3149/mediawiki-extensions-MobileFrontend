class Page
  include PageObject

  a(:toggle_view_mobile, css: '.stopMobileRedirectToggle')
  a(:toggle_view_desktop, id: 'mw-mf-display-toggle')

  def toggle_mobile_view
    toggle_view_mobile_element.click
  end

  def toggle_desktop_view
    toggle_view_desktop_element.click
  end
end
