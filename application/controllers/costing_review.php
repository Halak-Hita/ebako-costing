<?php
class costing_review extends Ci_Controller {

    public function __construct() {
        parent::__construct();

        if (!$this->session->userdata('id')) {
            redirect("/home");
        }
        $this->load->model('model_costing_review');
        $this->load->model('model_costing');
        $this->load->model('model_costing_history');
    }

    function index() {
        $data['costing_review'] = $this;
        $this->load->view('costing_review/index', $data);
    }

    function search($offset) {
        $customer_name = $this->input->post('customer_name');
        $model_code = $this->input->post('model_code');
        $this->render($offset, $customer_name, $model_code);
    }

    function approve($costing_id, $customer_id, $offset) {
        $rate_value = $this->input->get('rateValue');
        $picklist_ratevalue = $this->input->get('picklistRatevalue');
        $fob_price = $this->input->get('fobPrice');

        $costing_data = $this->model_costing->selectByIdAndCustomerId($costing_id, $customer_id);
        $this->model_costing->updatePropertyById($fob_price, $rate_value, $picklist_ratevalue, $costing_id);

        $this->model_costing_history->saveNew($costing_data);
        $this->model_costing_review->deleteByCostingIdAndCustomerId($costing_id, $customer_id);

        $this->render($offset, null, null);
    }

    function render($offset, $customer_name, $model_code) {
        $data['offset'] = $offset;

        $query = "
            with t as(
                    select 
                    costing_review.*, c.name as customer_name,
                    m.no as model_code
                    from costing_review
                    INNER JOIN customer c ON c.id = costing_review.customer_id
                    INNER JOIN model m ON m.id = costing_review.model_id
            ) select t.* from t where true";

        if (!empty($customer_name)) {
            $query .= " and t.customer_name LIKE '%$customer_name%'";
        }

        if (!empty($model_code)) {
            $query .= " and t.model_code LIKE '%$model_code%'";
        }

        $data['num_rows'] = $this->db->query($query)->num_rows();
        $limit = $this->config->item('limit');
        $data['offset'] = $offset;
        $data['num_page'] = (int) ceil($data['num_rows'] / $limit);
        $data['first'] = 0;
        $data['prev'] = (($offset - $limit) < 0) ? 0 : ($offset - $limit);
        $data['next'] = (($offset + $limit) > $data['num_rows']) ? $offset : ($offset + $limit);
        $data['last'] = ($data['num_page'] * $limit) > $data['num_rows'] ? (($data['num_page'] - 1) * $limit) : ($data['num_page'] * $limit);
        $data['page'] = (int) ceil($offset / $limit) + 1;
        $query .= "  order by t.year desc, t.customer_id asc, t.costing_id asc limit $limit offset $offset";
        $data['costing_reviews'] = $this->db->query($query)->result();
        $this->load->view('costing_review/search', $data);
    }
}
?>