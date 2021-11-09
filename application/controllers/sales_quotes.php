<?php

if (!defined('BASEPATH')) {
    exit('No direct script access allowed');
}

class Sales_quotes extends CI_Controller {

    public function __construct() {
        parent::__construct();
        if (!$this->session->userdata('id')) {
            echo "<script>location.reload()</script>";
        }
        $this->load->model('model_sales_quotes');
        $this->load->model('model_rfqdetail');
        $this->load->model('model_user');
        $this->load->model('model_customer');
    }

    public function index2() {
    	$this->load->view('sales_quotes/view_detail');
    }
    public function index() {
        $data['accessmenu'] = explode('|', $this->model_user->getAction($this->session->userdata('id'), "costing"));
        $offset = 0;
        $data['num_rows'] = $this->model_sales_quotes->getNumRows("", "");
        $limit = $this->config->item('limit');
        $data['num_page'] = (int) ceil($data['num_rows'] / $limit);
        $data['first'] = 0;
        $data['offset'] = $offset;
        $data['prev'] = (($offset - $limit) < 0) ? 0 : ($offset - $limit);
        $data['next'] = (($offset + $limit) > $data['num_rows']) ? $offset : ($offset + $limit);
        $data['last'] = ($data['num_page'] * $limit) > $data['num_rows'] ? (($data['num_page'] - 1) * $limit) : ($data['num_page'] * $limit);
        $data['page'] = (int) ceil($offset / $limit) + 1;
        $data['sq'] = $this->model_sales_quotes->search("", "", $limit, $offset);
        $data['customer'] = $this->model_customer->selectAll();
        //$this->load->view('sales_quotes/view', $data);
        $this->load->view('sales_quotes/index', $data);
    }

    function search($offset) {
        $data['accessmenu'] = explode('|', $this->model_user->getAction($this->session->userdata('id'), "model"));
        $sq_number_id = $this->input->post('sq_number_id');
        $customerid = $this->input->post('customerid');
        $data['num_rows'] = $this->model_sales_quotes->getNumRows($sq_number_id, $customerid);
        $limit = $this->config->item('limit');
        
        if(empty($offset) || $offset < -1){
        	$offset = 0;
        }
        
        $data['num_page'] = (int) ceil($data['num_rows'] / $limit);
        $data['offset'] = $offset;
        $data['first'] = 0;
        $data['prev'] = (($offset - $limit) < 0) ? 0 : ($offset - $limit);
        $data['next'] = (($offset + $limit) > $data['num_rows']) ? $offset : ($offset + $limit);
        $data['last'] = ($data['num_page'] * $limit) > $data['num_rows'] ? (($data['num_page'] - 1) * $limit) : ($data['num_page'] * $limit);
        $data['page'] = (int) ceil($offset / $limit) + 1;
        $data['sq'] = $this->model_sales_quotes->search($sq_number_id, $customerid, $limit, $offset);
        $this->load->view('sales_quotes/search', $data);
    }

    function search2($offset) {
    	if(empty($offset) || $offset < -1){
    		$offset = 0;
    	}
        $id = $this->input->post('id');
        $temp = $this->input->post('temp');
        $code = $this->input->post('code');
        $custcode = $this->input->post('custcode');
        $description = $this->input->post('description');
        $modeltypeid = $this->input->post('modeltypeid');
        $billto = $this->input->post('billto');
        $data['id'] = $id;
        $data['temp'] = $temp;
        $data['billto'] = $billto;
        if ($billto == 0) {
            $data['num_rows'] = $this->model_sales_quotes->getNumRows($code, $description, $modeltypeid, $custcode);
            $limit = $this->config->item('limit');
            $data['num_page'] = (int) ceil($data['num_rows'] / $limit);
            $data['first'] = 0;
            $data['prev'] = (($offset - $limit) < 0) ? 0 : ($offset - $limit);
            $data['next'] = (($offset + $limit) > $data['num_rows']) ? $offset : ($offset + $limit);
            $data['last'] = ($data['num_page'] * $limit) > $data['num_rows'] ? (($data['num_page'] - 1) * $limit) : ($data['num_page'] * $limit);
            $data['page'] = (int) ceil($offset / $limit) + 1;
            $data['model'] = $this->model_sales_quotes->searchAvailabel($code, $description, $modeltypeid, $custcode, $limit, $offset);
        } else {
            $data['model'] = [];// $this->model_sales_quotes->selectAllFromCostingByCustomer($billto);
        }
        $this->load->view('sales_quotes/search2', $data);
    }

    function create() {
        $this->load->model('model_category');
        $this->load->model('model_unit');
        $this->load->model('model_sales_modeltype');
        $data['category'] = $this->model_category->selectAll();
        $data['unit'] = $this->model_unit->selectAll();
        $data['modeltype'] = $this->model_sales_modeltype->selectAll();
        $data["finishoverview"] = $this->model_sales_quotes->selectFinishOverview();
        $data["constructionoverview"] = $this->model_sales_quotes->selectConstructionOverview();
        $data['expose'] = $this->model_sales_quotes->selectExpose();
        $data['internal'] = $this->model_sales_quotes->selectInternal();
        $data['panel'] = $this->model_sales_quotes->selectPanel();
        $data['veneer'] = $this->model_sales_quotes->selectVeneer();
        $data['others'] = $this->model_sales_quotes->selectOthers();
        $data['last_number'] = $this->model_sales_quotes->getLastModelNumber();
        $data['customer'] = $this->model_customer->selectAll();
        
        //$data['customer'] = $this->model_customer->selectListIdAndName();
        
        $this->load->view('sales_quotes/create', $data);
    }

    function save() {
        $modelno = $this->input->post('modelno');
        $description = trim($this->input->post('description'));
        $w = (double) $this->input->post('w');
        $d = (double) $this->input->post('d');
        $ht = (double) $this->input->post('ht');
        $cw = (double) $this->input->post('cw');
        $cd = (double) $this->input->post('cd');
        $ch = (double) $this->input->post('ch');
        
        $gw = (double) $this->input->post('gw');
        $nw = (double) $this->input->post('nw');
        
        $color = $this->input->post('color');
        $volume_package = (double) $this->input->post('volume_package');
        $modeltypeid = $this->input->post('modeltypeid');
        $yield = (double) $this->input->post('yield');
        $custcode = $this->input->post('custcode');
        $customerid = $this->input->post('customerid');
        
        $preparedby = $this->input->post('preparedby');
        if(empty($preparedby) || $preparedby == "null"){
        	$preparedby = "";
        }
        
        $checkedby = $this->input->post('checkedby');
        $approvedby = $this->input->post('approvedby');
        
        $is_temporary_photo = $this->input->post('is_temporary_photo');
        
        $finishoverview = "{" . $this->input->post('finishoverview') . "}";
        $constructionoverview = "{" . $this->input->post('constructionoverview') . "}";
        
        //$modelno = str_replace(' ', '', $modelno);

        $file_element_name = 'fileupload';
        $upload_path = '';
        $config['upload_path'] = './files/';
        $config['allowed_types'] = 'gif|jpg|png|jpeg';
        $config['max_size'] = 1024 * 8;
        $config['encrypt_name'] = TRUE;
        if (!file_exists( './files/' )) {
        	mkdir('./files/', 0777, true);
        }
        $this->load->library('upload', $config);
        
        $data_model = array(
            'no' => $modelno,
            'description' => $description,
            'color' => $color,
            'dw' => round($w, 3),
            'dd' => round($d, 3),
            'dht' => round($ht, 3),
            'cw' => round($cw, 3),
            'cd' => round($cd, 3),
            'ch' => round($ch, 3),
        		
            'gw' => round($gw, 3),
            'nw' => round($nw, 3),
        		
            'volumepackage' => round($volume_package, 3),
            'modeltypeid' => $modeltypeid,
            'yield' => round($yield, 3),
            'custcode' => $custcode,
            'finishoverview' => $finishoverview,
            'constructionoverview' => $constructionoverview,
            'preparedby' => $preparedby,
            'checkedby' => $checkedby,
            'approvedby' => $approvedby,
        	"is_temporary_photo" =>	$is_temporary_photo,
            'customerid' => $customerid,
        );

	$this->upload->initialize($config);

        if (!$this->upload->do_upload($file_element_name)) {
            if ($this->model_sales_quotes->insert($data_model)) {
                echo json_encode(array('nofile' => true));
            } else {
                echo json_encode(array('msg' => $this->db->_error_message()));
                unlink($data['full_path']);
            }
        } else {
            $data = $this->upload->data();
            $data_model['filename'] = $data['file_name'];
            if ($this->model_sales_quotes->insert($data_model)) {
                echo json_encode(array('success' => true));
            } else {
                echo json_encode(array('msg' => $this->db->_error_message()));
                unlink($data['full_path']);
            }
        }

        @unlink($_FILES[$file_element_name]);
    }

    function update() {
        $id = $this->input->post('id');
        $modelno = $this->input->post('modelno');
        $description = $this->input->post('description');
        $w = (double) $this->input->post('w');
        $d = (double) $this->input->post('d');
        $ht = (double) $this->input->post('ht');
        $cw = (double) $this->input->post('cw');
        $cd = (double) $this->input->post('cd');
        $ch = (double) $this->input->post('ch');
        $customerid = $this->input->post('customerid');
        
        $gw = (double) $this->input->post('gw');
        $nw = (double) $this->input->post('nw');
        
        $color = $this->input->post('color');
        $volume_package = (double) $this->input->post('volume_package');
        $modeltypeid = $this->input->post('modeltypeid');
        $yield = (double) $this->input->post('yield');
        $finishoverview = "{" . $this->input->post('finishoverview') . "}";
        $constructionoverview = "{" . $this->input->post('constructionoverview') . "}";
        
        $file_element_name = 'fileupload';
        $upload_path = '';
        $config['upload_path'] = './files/';
        $config['allowed_types'] = 'gif|jpg|png|jpeg';
        $config['max_size'] = 1024 * 8;
        $config['encrypt_name'] = TRUE;
        if (!file_exists( './files/' )) {
        	mkdir('./files/', 0777, true);
        }else {
        }
        $this->load->library('upload', $config);
        
//        $modelno = str_replace(' ', '', $modelno);
        $filename = $this->input->post('filename');
        $custcode = $this->input->post('custcode');

        $preparedby = $this->input->post('preparedby');
        if(empty($preparedby) || $preparedby == "null"){
        	$preparedby = "";
        }
        $checkedby = $this->input->post('checkedby');
        $approvedby = $this->input->post('approvedby');
        $is_temporary_photo = $this->input->post('is_temporary_photo');
        
        $data_model = array(
            'no' => $modelno,
            'description' => $description,
            'color' => $color,
            'dw' => round($w, 3),
            'dd' => round($d, 3),
            'dht' => round($ht, 3),
            'cw' => round($cw, 3),
            'cd' => round($cd, 3),
            'ch' => round($ch, 3),
        		
            'gw' => round($gw, 3),
            'nw' => round($nw, 3),
        		
            'volumepackage' => round($volume_package, 3),
            'filename' => $filename,
            'modeltypeid' => $modeltypeid,
            'yield' => round($yield, 3),
            'custcode' => $custcode,
            'finishoverview' => $finishoverview,
            'constructionoverview' => $constructionoverview,
        		
            'preparedby' => $preparedby,
            'checkedby' => $checkedby,
            'approvedby' => $approvedby,
            'is_temporary_photo' => $is_temporary_photo,
            'customerid' => $customerid,
        );

        if ( $this->upload->do_upload($file_element_name) ) {
            $data = $this->upload->data();
            $data_model['filename'] = $data['file_name'];
            $filetodelete = "./files/" . $filename;
            if (file_exists($filetodelete)) {
            	@unlink($filetodelete);
            }
        }
        
        @unlink($_FILES[$file_element_name]);
        
        $this->model_sales_quotes->update($data_model, array("id" => $id));
        
        echo json_encode(array('success' => true));
    }
    
    function delete($id) {
        try {
            if ($this->model_sales_quotes->delete($id)) {
                echo "deleted success";
            }
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
    }

    function viewdetail($id) {
        $data['accessmenu'] = explode('|', $this->model_user->getAction($this->session->userdata('id'), "model"));
        $this->load->model('model_bom');
        $data['id'] = $id;
        $data['sq'] = $this->model_sales_quotes->selectById($id);
        $data['sqdetail'] = $this->model_sales_quotes->selectsqdetailbyid($id);
        $this->load->view('sales_quotes/view_detail', $data);
    }

    function viewitem($id) {
        $this->load->model('model_sales_quotesitem');
        $data['modelitem'] = $this->model_sales_quotesitem->selectByModelIdAndParentId($id);
        $this->load->view('sales_quotes/viewitem', $data);
    }

    function setupholstry($modelid) {
        $data['modelid'] = $modelid;
        $this->load->view('sales_quotes/setupholstry', $data);
    }

    function saveupholstry() {
        $modelid = $this->input->post('modelid');
        $itemid = $this->input->post('itemid');
        $unitid = $this->input->post('unitid');
        $thickness = (double) $this->input->post('thickness');
        $length = (double) $this->input->post('length');
        $width = (double) $this->input->post('width');
        $qty = (double) $this->input->post('qty');
        $location = $this->input->post('location');
        $specifications = $this->input->post('specifications');
        $is_picklist = $this->input->post('is_picklist');
        
        $data = array(
            "modelid" => $modelid,
            "itemid" => $itemid,
            "unitid" => $unitid,
            "thickness" =>round( $thickness, 3),
            "length" => round( $length, 3),
            "width" => round( $width, 3), 
            "qty" => round($qty, 3),
            "location" => $location,
            "specifications" => $specifications,
        	"is_picklist" => $is_picklist,
            "hardwaretypeid" => 3
        );
        if ($this->db->insert("modelhardware", $data)) {
            echo json_encode(array('success' => true));
        } else {
            echo json_encode(array('msg' => $this->db->_error_message()));
        }
    }

    function editupholstry($modelid, $id) {
        $data['modelid'] = $modelid;
        $data["upholstery"] = $this->model_sales_quotes->selectHardwareById($id);
        $this->load->view('sales_quotes/editupholstry', $data);
    }

    function updateupholstry() {
        $data = array(
            "itemid" => $this->input->post('itemid'),
            "unitid" => $this->input->post('unitid'),
            "thickness" => round( (double) $this->input->post('thickness'), 3),
            "length" => round( (double) $this->input->post('length'), 3),
            "width" => round( (double) $this->input->post('width'), 3),
            "qty" => round((double) $this->input->post('qty'), 3),
            "location" => $this->input->post('location'),
            "specifications" => $this->input->post('specifications'),
        	"is_picklist" => $this->input->post('is_picklist'),
        );
        if ($this->db->update("modelhardware", $data, array("id" => $this->input->post('id')))) {
            echo json_encode(array('success' => true));
        } else {
            echo json_encode(array('msg' => $this->db->_error_message()));
        }
    }

    function chooseitem($tempid, $tempname) {
        $this->load->model('model_component');
        $this->load->model('model_item');
        $data['tempid'] = $tempid;
        $data['tempname'] = $tempname;
        $data['component'] = $this->model_component->search2();
        $this->load->view('sales_quotes/chooseitem', $data);
    }


    function imageview($filename) {
        echo "<img src='". base_url() ."/files/$filename' style='max-width:500px;max-height:500px'>";
    }

    function edit($id) {
        $this->load->model('model_sales_modeltype');
        $this->load->model('model_item');
        $data['model'] = $this->model_sales_quotes->selectById($id);
        $data['modeltype'] = $this->model_sales_modeltype->selectAll();
        $data["finishoverview"] = $this->model_sales_quotes->selectFinishOverview();
        $data["constructionoverview"] = $this->model_sales_quotes->selectConstructionOverview();
        $data['expose'] = $this->model_sales_quotes->selectExpose();
        $data['internal'] = $this->model_sales_quotes->selectInternal();
        $data['panel'] = $this->model_sales_quotes->selectPanel();
        $data['veneer'] = $this->model_sales_quotes->selectVeneer();
        $data['others'] = $this->model_sales_quotes->selectOthers();
        $data['last_number'] = $this->model_sales_quotes->getLastModelNumber();
        $data['customer'] = $this->model_customer->selectAll();
        
        $this->load->view('sales_quotes/edit', $data);
    }

    function deletehardware($hardwareid) {
        if ($this->model_sales_quotes->deleteHardware($hardwareid)) {
            echo json_encode(array('success' => true));
        } else {
            echo json_encode(array('msg' => $this->db->_error_message()));
        }
    }

    function setprice($modelid) {
        $this->load->model('model_currency');
        $data['modelid'] = $modelid;
        $data['currency'] = $this->model_currency->selectAll();
        $data['model'] = $this->model_sales_quotes->selectById($modelid);
        $this->load->view('sales_quotes/setprice', $data);
    }

    function dosetprice() {
        $modelid = $this->input->post('modelid');
        $curr = $this->input->post('curr');
        $price = $this->input->post('price');
        $this->model_sales_quotes->setprice($modelid, $price, $curr);
    }

    function choosematerial() {
        $this->load->model('model_component');
        $data['component'] = $this->model_component->selecAll();
        $this->load->view('sales_quotes/choosecomponent', $data);
    }

    function addhardware($modelid) {
        $data['modelid'] = $modelid;
        $this->load->model('model_hardwaretype');
        $data['hardwaretype'] = $this->model_hardwaretype->selectAll();
        $this->load->view('sales_quotes/addhardware', $data);
    }

    function edithardware($modelid, $hardwareid) {
        $data['modelid'] = $modelid;
        $data['hardwareid'] = $hardwareid;
        $data['hardware'] = $this->model_sales_quotes->selectHardwareById($hardwareid);
        $this->load->model('model_hardwaretype');
        $data['hardwaretype'] = $this->model_hardwaretype->selectAll();
        $this->load->view('sales_quotes/edithardware', $data);
    }

    function updatehardware() {
        $data = array(
            "modelid" => $this->input->post("modelid"),
            "itemid" => $this->input->post("itemid"),
            "unitid" => $this->input->post("unitid"),
            "hardwaretypeid" => $this->input->post("hardwaretypeid"),
            "qty" =>  round($this->input->post("qty"), 3),
            "location" => $this->input->post("location"),
            "supplier" => $this->input->post("supplier"),
            "notes" => $this->input->post("notes"),
            "is_picklist" => $this->input->post("is_picklist"),
        );
        if ($this->db->update("modelhardware", $data, array("id" => $this->input->post("id")))) {
            echo json_encode(array('success' => true));
        } else {
            echo json_encode(array('msg' => $this->db->_error_message()));
        }
    }

    function viewlisthardware($element) {
        $this->load->model('model_item');
        $data['element'] = $element;
        $data['item'] = $this->model_item->selectAll();
        $this->load->view('sales_quotes/listhardware', $data);
    }

    function isExistCode($code) {
        echo $this->model_sales_quotes->isExistCode($code);
    }

    function copy($modelid) {
        $data['modelid'] = $modelid;
        $this->load->view('sales_quotes/copy', $data);
    }

    function docopy() {
        $modelid = $this->input->post('modelid');
        $modelno = $this->input->post('modelno');
       // print_r($modelid." - ".$modelno);
        if ($this->model_sales_quotes->docopy($modelid, $modelno)) {
            echo json_encode(array('success' => true));
        } else {
            echo json_encode(array('msg' => $this->db->_error_message()));
        }
    }

    function getFinishing($modelid) {
        $finishing = $this->model_sales_quotes->selectfinishingByModelId($modelid);
        $strfinishing = "";
        foreach ($finishing as $finishing) {
            $strfinishing .= "-" . $finishing->description . "\n";
        }
        echo $strfinishing;
    }

    function getFabrication($modelid) {
        $hardware = $this->model_sales_quotes->selectItemByModelId($modelid, 2);
        $strhardware = "";
        foreach ($hardware as $hardware) {
            $strhardware .= "- " . $hardware->description;
        }
        echo $strhardware;
    }

    function cdsprint($id, $st) {
        $this->load->model('model_hardwaretype');
        $this->load->model('model_sales_quotes');
        $this->load->model('model_item');
        $data['model'] = $this->model_sales_quotes->selectById($id);
        $data['wood'] = $this->model_item->selectWood();
        $data["finishoverview"] = $this->model_sales_quotes->selectFinishOverview();
        $data["constructionoverview"] = $this->model_sales_quotes->selectConstructionOverview();
        $data["decorativehardware"] = $this->model_sales_quotes->selectItemHarwareByModelId($id, 1);
        $data["functionalhardware"] = $this->model_sales_quotes->selectItemHarwareByModelId($id, 2);
        $data["upholstery"] = $this->model_sales_quotes->selectItemHarwareByModelId($id, 3);
        $data["packingmaterial"] = $this->model_sales_quotes->selectPackingMaterialByModelId($id, 3);
        $data['glass'] = $this->model_sales_quotes->selectGlassByModelId($id);
        $data['marble'] = $this->model_sales_quotes->selectmarbleByModelId($id);
        $data['latherinlay'] = $this->model_sales_quotes->selectlatherinlayByModelId($id);
        $data['layout'] = $this->model_sales_quotes->selectLayout($id);
        $data['additionalnotes'] = $this->model_sales_quotes->getAdditionalNotes($id);
        $data['reviewnotes'] = $this->model_sales_quotes->selectreviewnotesandhistorybymodel($id);
        //$data['solidwood'] = $this->model_sales_quotes->selectMaterialSpecificationByGroup($id, "3");
        $data['solidwood'] = $this->model_sales_quotes->selectSolidwoodByModelId($id);
       // $data['mdf_plywd_prtcl'] = $this->model_sales_quotes->selectMaterialSpecificationByGroup($id, "4,5,6");
        $data['mdf_plywd_prtcl'] = $this->model_sales_quotes->selectPlywoodByModelId($id);
        $data['veneer'] = $this->model_sales_quotes->selectMaterialSpecificationByGroup($id, "7");
        $data['expose'] = $this->model_sales_quotes->selectExpose();
        $data['internal'] = $this->model_sales_quotes->selectInternal();
        $data['panel'] = $this->model_sales_quotes->selectPanel();
        $data['material_veneer'] = $this->model_sales_quotes->selectVeneer();
        //$data['material_veneer'] = $this->model_sales_quotes->selectVeneerByModelId($id);
        
        $data['others'] = $this->model_sales_quotes->selectOthers();

        $data['special_requirement'] = $this->model_sales_quotes->selectSpecialRequirement();
        $data['packing_type'] = $this->model_sales_quotes->selectPackingType();
        
        $data['expose_other'] = $this->model_sales_quotes->selectOtherMaterialOverviewByTypeanModelId($id, 1);
        $data['internal_other'] = $this->model_sales_quotes->selectOtherMaterialOverviewByTypeanModelId($id, 2);
        $data['panel_other'] = $this->model_sales_quotes->selectOtherMaterialOverviewByTypeanModelId($id, 3);
        $data['veneer_other'] = $this->model_sales_quotes->selectVeneerByModelId($id);
        $data['others_other'] = $this->model_sales_quotes->selectOtherMaterialOverviewByTypeanModelId($id, 5);
        
        $data['special_requirement_other'] = $this->model_sales_quotes->selectOtherSpecialRequirementByModelIdAndType($id, 11);
        $data['packing_type_other'] = $this->model_sales_quotes->selectOtherPackingTypeByModelIdAndType($id, 12);

        $this->load->view('sales_quotes/cdsprint', $data);
    }


}
