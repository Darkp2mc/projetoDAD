<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class User extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id'                => $this->id,
            'type'              => $this->type,
            'name'              => $this->name,
            'email'             => $this->email,
            'photo_url'         => $this->photo_url,
            'email_verified_at' => $this->email_verified_at->toDateTimeString(),
            'created_at'        => $this->created_at->toDateTimeString(),
            'updated_at'        => $this->updated_at->toDateTimeString(),
            'deleted_at'        => $this->deleted_at->toDateTimeString(),
        ];
    }
}
