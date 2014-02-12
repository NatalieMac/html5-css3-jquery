$(document).ready(function(){
	filter.init();
});

/* JS for the filterable photo gallery */
var filter = {
	settings: {
		container: $('.photo-grid')
	},
	init: function() {
		this.buildNav();
	},
	buildNav: function() {
		var items = this.settings.container.find('img'),
			data = items.map(function(){
				return $(this).data('cat')
			}).get(),
			unique = data.filter(function(item, i, a){
				return i == a.indexOf(item);
			}).sort();

		var filterNav = $('<nav id="filter"><ul></ul></nav>'),
			navList = filterNav.find('ul');

		filterNav.insertBefore(this.settings.container);

		navList.append('<li><a href="#" class="selected" data-cat="all">All</a></li>');
		for (i=0; i<unique.length; i++) {
			navList.append('<li><a href="#" data-cat="' + unique[i] + '">' + filter.capitalize(unique[i]) + '</a></li>')
		}
		this.doFilter(filterNav);
	},
	doFilter: function(filterNav) {
		filterNav.find('a').on('click', function(e) {
			var $this = $(this),
				type = $this.data('cat'),
				allItems = filter.settings.container.find('img'),
				curItems = allItems.filter('[data-cat="' + type + '"]');
			$this.addClass('selected').parents('li').siblings('li').find('a').removeClass('selected');
			allItems.parents('li').removeClass('selected');
			if (type == 'all') {
				filter.settings.container.removeClass('selected');
			} else {
				filter.settings.container.addClass('selected');
				curItems.parents('li').addClass('selected');
			}
			e.preventDefault();
		})
	},
	capitalize: function (string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}
};