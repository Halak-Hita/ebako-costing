<table>
    <tr>
        <td>
            <table>
                <tr>
                    <td>
                        <b>PT EBAKO NUSANTARA</b>
                        Jl. Terboyo Industri Blok N-3C
                        Kawasan Industri Terboyo Semarang - Indonesia
                        Telp. 62.24.6593407 Fax. 62.24.6591732
                    </td>
                </tr>
            </table>
            <table>
                <tr>
                    <td>
                        To
                    </td>
                    <td>
                        :
                    </td>
                    <td>
                        <?php echo $_REQUEST["to"]; ?>
                    </td>
                    <td>
                        From
                    </td>
                    <td>
                        :
                    </td>
                    <td>
                        Costing Department
                    </td>
                </tr>
                <tr>
                    <td>
                        Company
                    </td>
                    <td>
                        :
                    </td>
                    <td>
                        <?php echo $_REQUEST["cust"]; ?>
                    </td>
                    <td>
                        Date
                    </td>
                    <td>
                        :
                    </td>
                    <td>
                        <?php echo date("d M Y"); ?>
                    </td>
                </tr>
                <tr>
                    <td>
                        Fax No
                    </td>
                    <td>
                        :
                    </td>
                    <td>

                    </td>
                    <td>
                        Total Page(s)
                    </td>
                    <td>
                        :
                    </td>
                    <td>
                        <?php echo (round(count($costing) / 2)); ?>
                    </td>
                </tr>

                <tr>
                    <td>
                        Reference
                    </td>
                    <td>
                        :
                    </td>
                    <td>

                        <?php echo $_REQUEST["ref"]; ?>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>