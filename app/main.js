$('document').ready(function() {
    var StaffInfo = bios;
    var $modal = $('#staffWorker');
    $($('#blog').find('.row')).each(function(index, element) {
        var $currList = this;
        var currIndex = 0;
        $($($currList).find('img')).each(function(index1, element2) {
            var $currItem = this;
            if(index === 1){
            	currIndex = index1 + 4;
            }else{
            	currIndex = index1;
            }
           $($currItem).attr('data-toggle', 'modal').attr('data-target', '#staffWorker').attr('item',currIndex);
        });
    });
    $modal.on('show.bs.modal', function(data){
    	var currItemIndex  = data.relatedTarget.attributes[5].value;
    	var currStaff = StaffInfo[currItemIndex];
    	$($modal.find('img')).attr('src', currStaff.image);
    	$($modal.find('#mTitle')).append(currStaff.name);
    	$($modal.find('p')).append(currStaff.description);
    })
    $modal.on('hidden.bs.modal', function(data){
    	$($modal.find('img')).attr('src','');
    	$($modal.find('#mTitle')).empty();
    	$($modal.find('p')).empty();
    })

});
