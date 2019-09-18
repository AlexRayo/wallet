<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Transfer extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        //return parent::toArray($request);
        return [
            'id' => $this->id,
            'wallet_id' => $this->wallet_id,
            'description' => $this->description,
            'amount' => $this->amount
        ];
    }
    //in addition u can send more data, so u can add whatever u want in this function 'with'; this only shows on single article like
    public function with($request){
        return [
            'version' => '1.0.0',
            'author_url' => url('http://yutaru.net')
        ];
    }
}
