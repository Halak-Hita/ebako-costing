-- Column: q_wood

-- ALTER TABLE public.costing DROP COLUMN q_wood;

ALTER TABLE public.costing ADD COLUMN q_wood text;
ALTER TABLE public.costing ADD COLUMN q_veneer text;
ALTER TABLE public.costing ADD COLUMN q_upholstery_type text;
ALTER TABLE public.costing ADD COLUMN q_fabric text;
ALTER TABLE public.costing ADD COLUMN q_leather text;
ALTER TABLE public.costing ADD COLUMN q_other_remarks text;
ALTER TABLE public.costing ADD COLUMN q_shipping_conf text;
ALTER TABLE public.costing ADD COLUMN q_packing text;
ALTER TABLE public.costing ADD COLUMN q_qty_perbox text;
ALTER TABLE public.costing ADD COLUMN q_box_dimension double precision;
ALTER TABLE public.costing ADD COLUMN q_cube double precision;
ALTER TABLE public.costing ADD COLUMN q_finishes character varying(50);



---- Update table sales_quotes_detail
ALTER TABLE public.sales_quotes_detail ADD COLUMN q_wood text;
ALTER TABLE public.sales_quotes_detail ADD COLUMN q_veneer text;
ALTER TABLE public.sales_quotes_detail ADD COLUMN q_upholstery_type text;
ALTER TABLE public.sales_quotes_detail ADD COLUMN q_fabric text;
ALTER TABLE public.sales_quotes_detail ADD COLUMN q_leather text;
ALTER TABLE public.sales_quotes_detail ADD COLUMN q_other_remarks text;
ALTER TABLE public.sales_quotes_detail ADD COLUMN q_shipping_conf text;
ALTER TABLE public.sales_quotes_detail ADD COLUMN q_packing text;
ALTER TABLE public.sales_quotes_detail ADD COLUMN q_qty_perbox text;
ALTER TABLE public.sales_quotes_detail ADD COLUMN q_box_dimension double precision;
ALTER TABLE public.sales_quotes_detail ADD COLUMN q_cube double precision;
ALTER TABLE public.sales_quotes_detail ADD COLUMN q_finishes character varying(50);
ALTER TABLE public.sales_quotes_detail ALTER COLUMN dw SET DEFAULT 0;
ALTER TABLE public.sales_quotes_detail ALTER COLUMN dd SET DEFAULT 0;
ALTER TABLE public.sales_quotes_detail ALTER COLUMN dht SET DEFAULT 0;
ALTER TABLE public.sales_quotes_detail ADD COLUMN cw double precision;
ALTER TABLE public.sales_quotes_detail ADD COLUMN cd double precision;
ALTER TABLE public.sales_quotes_detail ADD COLUMN ch double precision;




