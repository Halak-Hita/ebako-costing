<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of model_costing_review
 *
 * @author hp
 */
class model_costing_review extends CI_Model {

    public function __construct() {
        parent::__construct();
    }

    function selectAll() {
        $query = "select * from costing_review
                order by customer_id asc, year desc";
        return $this->db->query($query)->result();
    }

    function create($data) {
        return $this->db->insert('costing_review', array(
                    "costing_id" => $data['costing_id'],
                    "rate_value" => $data['rate_value'],
                    "pick_list_rate_value" => $data['pick_list_rate_value'],
                    "fob_price" => $data['fob_price'],
                    "margin" => $data['margin'],
                    "year" => $data['year'],
                    "customer_id" => $data['customer_id'],
                    "model_id" => $data['model_id'],
                    "old_fob" => $data['old_fob'],
                ));
    }
    
    function selectIdByCostingIdAndCostingReviewYear($costing_id, $year) {
        $query = "select id
                from costing_review
                where costing_id='$costing_id'
                and year='$year'
                order by customer_id ASC";
        return $this->db->query($query)->result();
    }

    function selectByReviewYear($reviewYear) {
        $query = "select * from costing_review
                where year='$reviewYear'
                order by customer_id ASC";
        return $this->db->query($query)->result();
    }

    function updateCostingReviewById($data) {
        $this->db->where("id", $data['id']);
        $this->db->update('costing_review', array(
            "rate_value" => $data['rate_value'],
            "pick_list_rate_value" => $data['pick_list_rate_value'],
            "fob_price" => $data['fob_price'],
            "margin" => $data['margin'],
            "year" => $data['year']
        ));
    }
        
    function deleteByCostingId($costing_id) {
        $query = "delete from costing_review where costing_id=$costing_id";
        return $this->db->query($query);
    }

    function deleteByCostingIdAndCustomerId($costing_id, $customer_id) {
        $query = "delete from costing_review where costing_id=$costing_id AND customer_id=$customer_id";
        return $this->db->query($query);
    }
    
}

?>
