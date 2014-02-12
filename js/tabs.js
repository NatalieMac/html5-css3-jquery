$(document).ready(function(){
	tabs.init();
});

/* JS for the animated tabs */
var tabs = {
	settings: {
		container: $('.tab-section')
	},
	init: function(){
		this.createTabs();
	},
	createTabs: function() {
		var sections = this.settings.container.find('section')
			tabs = $('<ul class="tabs"></ul>');

		this.settings.container.addClass('tabs-active').prepend(tabs);
		sections.each(function(){
			var $this = $(this),
				title = $this.find('h1').first().text(),
				slug = $this.attr('id');
			tabs.append('<li><a href="#' + slug + '">' + title + '</a></li>');
		});
		this.activateTabs(tabs, sections);
	},
	activateTabs: function(tabs, sections) {
		sections.hide()

		tabs.find('a').on('click', function(e){
			var $this = $(this),
				href = $this.attr('href');

			$this.parents('li').addClass('active').siblings('li').removeClass('active');
			sections.filter(':visible').fadeOut();
			$(href).fadeIn();
			e.preventDefault();
		}).filter(':first').click();;
	}
}