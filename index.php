<?php
/**
 * Created by PhpStorm.
 * User: eduardo
 * Date: 23/06/15
 * Time: 12:15
 */

header('Content-Type: application/json');

class Request {

    private $request = [80,8080,8081,8082,8083,8084,8085,8086,8087];
    private $requestJSON;
    public $ping = array();

    public function ping()
    {
        for ($i = count($this->request); $i--; ) {
            $c = new Ping('177.139.241.97', 'gateway', $this->request[$i]);
            $c->ping();
            array_push($this->ping, $c);
        }
    }

    public function toJSON()
    {
        return json_encode($this);
    }
}

class Ping
{
    public $address;
    public $name;
    public $port;
    public $result;
    public $status;

    function __construct($address, $name, $port)
    {
        $this->address = $address;
        $this->name = $name;
        $this->port = $port;
    }

    /**
     * @return mixed
     */
    public function getAddress()
    {
        return $this->address;
    }

    /**
     * @param mixed $address
     */
    public function setAddress($address)
    {
        $this->address = $address;
    }

    /**
     * @return mixed
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * @param mixed $name
     */
    public function setName($name)
    {
        $this->name = $name;
    }

    /**
     * @return mixed
     */
    public function getPort()
    {
        return $this->port;
    }

    /**
     * @param mixed $port
     */
    public function setPort($port)
    {
        $this->port = $port;
    }

    /**
     * @return mixed
     */
    public function getResult()
    {
        return $this->result;
    }

    /**
     * @param mixed $result
     */
    public function setResult($result)
    {
        $this->result = $result;
    }

    /**
     * @return mixed
     */
    public function getStatus()
    {
        return $this->status;
    }

    /**
     * @param mixed $status
     */
    public function setStatus($status)
    {
        $this->status = $status;
    }

    public function ping()
    {
        exec('ping -c 1 -p' . $this->port . ' ' . $this->address, $r, $s);
        $this->setResult($r[2]);
        $this->setStatus($s);
    }

    public function toJSON()
    {
        return json_encode($this);
    }

}

$r = new Request();
$r->ping();
print_r($r);



//print_r(($s));
