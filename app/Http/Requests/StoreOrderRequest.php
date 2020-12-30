<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreOrderRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'status'            => 'required',
            'customer_id'       => 'required',
            'notes'             => 'nullable',
            'total_price'       => 'required',
            'date'              => 'required',
            'prepared_by'       => 'nullable',
            'delivered_by'      => 'nullable',
            'opened_at'         => 'required',
            'current_status_at' => 'required',
            'closed_at'         => 'nullable',
            'preparation_time'  => 'nullable',
            'delivery_time'    => 'nullable',
            'total_time'        => 'nullable'
        ];
    }
}
